package com.web.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserRequest {

    private String email;

    private String password;

    private String fullName;

}
