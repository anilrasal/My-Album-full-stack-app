package com.restapiexample.SpringRest3.util.constants;

public enum Authority {

    READ,
    WRITE,
    UPDATE,
    USER, //can update, delete self object, read anything
    ADMIN // can update, delete and read any object,
    
}
