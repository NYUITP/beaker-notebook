/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beaker.rest;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twosigma.beaker.cometd.OutputLogService;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * RESTful API for output log service (stdout and stderr from evaluator)
 *
 * @author spot
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("outputlog")
public class OutputLogRest {

  @Inject
  private OutputLogService _OutputLogService;

  @GET
  @Path("get")
  public List<OutputLogService.OutputLine> get(@QueryParam("linecount") String lineCount) {
    // lineCount ignored XXX
    return _OutputLogService.log;
  }

  @GET
  @Path("clear")
  public String clear() {
    _OutputLogService.log = new ArrayList<OutputLogService.OutputLine>();
    return "\"ok\"";
  }
}