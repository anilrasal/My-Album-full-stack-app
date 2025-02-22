package com.restapiexample.SpringRest3.payload.album;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PhotoDTO {
    

    private long id;

    private String name;

    private String description;

    private String fileName;

    private String download_link;
}
