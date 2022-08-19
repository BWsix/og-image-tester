import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  const { query } = parse(req.url || "/", true);
  const { id, widths, heights, extension } = query || {};

  if (typeof id !== "string") {
    throw new Error("Id must be type of string.");
  }

  const parsedRequest: ParsedRequest = {
    id,
    fileType: extension === "jpeg" ? extension : "png",
    widths: getArray(widths),
    heights: getArray(heights),
  };

  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === "undefined") {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}
