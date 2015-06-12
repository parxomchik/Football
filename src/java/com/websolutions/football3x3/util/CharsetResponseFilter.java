package com.websolutions.football3x3.util;

/**
 * Created by Владислав on 12.06.2015.
 */
import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

import javax.ws.rs.core.MediaType;

public class CharsetResponseFilter implements ContainerResponseFilter {

    public ContainerResponse filter(ContainerRequest request, ContainerResponse response) {

        MediaType contentType = response.getMediaType();
        response.getHttpHeaders().putSingle("Content-Type", contentType.toString() + ";charset=UTF-8");

        return response;
    }
}
