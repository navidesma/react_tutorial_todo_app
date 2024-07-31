import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Card, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

interface TableComponentProps<T> {
    items: T[];
    columns: { label: string; content: (item: T) => JSX.Element }[];
}

export default function TableComponent<T>({ columns, items }: TableComponentProps<T>) {
    const [isMobileDevice, setIsMobileDevice] = React.useState(window.innerWidth <= 600);

    React.useEffect(() => {
        const handleWindowReSize = () => {
            setIsMobileDevice(window.innerWidth <= 600);
        };

        window.addEventListener("resize", handleWindowReSize);

        return () => {
            window.removeEventListener("resize", handleWindowReSize);
        };
    }, []);

    if (isMobileDevice) {
        return (
            <Box>
                {items.map((item) => (
                    <Card
                        sx={{
                            padding: "2rem",
                            marginTop: "2rem",
                            boxShadow: "1px 2px 6px",
                        }}
                    >
                        {columns.map((column) => (
                            <Typography mt={1}>
                                {column.label ? column.label + ": " : ""}
                                {column.content(item)}
                            </Typography>
                        ))}
                    </Card>
                ))}
            </Box>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell>{column.label}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => (
                        <StyledTableRow key={index}>
                            {columns.map((column) => (
                                <StyledTableCell align='left'>
                                    {column.content(item)}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
