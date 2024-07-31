import React from "react";
import { Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <Container maxWidth='xl' sx={{ marginTop: "3rem" }}>
                {children}
            </Container>
        </>
    );
}
