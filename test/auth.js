const assert = require('assert');
const {hashPassword} = require("../src/services/auth");

describe("Authentication",()=>{

  it("should hash password",async()=>{
    let input = {
      password: "MyStr0nGpAssW()rD!"
    };
    let hash = await hashPassword(input);
    assert.notEqual(input.password,hash)
  })

  it("should generate token",()=>{
    
  })

  it("should be valid",()=>{

  })
})

