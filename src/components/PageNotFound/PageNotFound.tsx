import React from "react";
import { _ } from "@/lib/translate";

export const PageNotFound = (props, state) => (
    <div style={{ display: "flex", flex: "1", alignItems: "center", justifyContent: "center" }}>
        {_("Page not found")}
    </div>
);
