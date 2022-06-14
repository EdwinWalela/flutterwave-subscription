const assert = require('assert');
const {hashPassword,generateToken} = require("../src/services/auth");

describe("Authentication",()=>{

  it("should hash password",async()=>{
    let input = {
      password: "MyStr0nGpAssW()rD!"
    };
    let hash = await hashPassword(input);
    assert.notEqual(input.password,hash)
  })

  it("should generate token",async()=>{
    let storedUser = {
      password:"MyStr0nGpAssW()rD!"
    }
    let userRequest = {
      password:"MyStr0nGpAssW()rD!"
    }
    storedUser.password = await hashPassword(storedUser);
    let token = await generateToken(storedUser,userRequest);
    
    assert.notEqual(true,token instanceof Error)

    
  })

})

