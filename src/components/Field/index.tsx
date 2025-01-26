import { JSX } from "react";

export type ValueType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "time"
  | "array"
  | "object"
  | "file"
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "html"
  | "markdown"
  | "json"
  | "xml"
  | "yaml"
  | "csv"
  | "excel"
  | "word"
  | "powerpoint"
  | "zip"
  | "rar"
  | "tar"
  | "gzip"
  | "bzip2"
  | "7z"
  | "url"
  | "email"
  | "phone"
  | "ip";

export type FieldProps = {
  text?: string | number | boolean;
  valueType: ValueType;
  mode: "read" | "update" | "edit";
  plain: boolean;
  renderForm: (props: any) => JSX.Element;
  render: (props: any) => JSX.Element;
};
