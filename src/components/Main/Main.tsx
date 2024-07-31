import React from "react";
import { Container } from "@mui/material";

export default function Main({ children }: { children: React.ReactNode }) {
    return <Container maxWidth='xl'>{children}</Container>;
}
