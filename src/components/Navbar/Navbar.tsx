import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UISliceType } from "../../store/ui-slice";

const pages: { name: string; route: string; icon: React.ReactElement }[] = [
    { name: "ایجاد یادداشت", route: "/home/new-note", icon: <AddIcon /> },
    { name: "پروفایل من", route: "/profile", icon: <AccountCircleIcon /> },
    { name: "خروج", route: "/logout", icon: <ExitToAppIcon /> },
];

export default function Navbar() {
    const { firstName, lastName } = useSelector((store: { ui: UISliceType }) => store.ui);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <DescriptionIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='#app-bar-with-responsive-menu'
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        یادداشت ها
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={toggleDrawer(true)}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer
                            open={open}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                        >
                            <Box
                                sx={{ width: 250 }}
                                role='presentation'
                                onClick={toggleDrawer(false)}
                            >
                                <List>
                                    {pages.map((page) => (
                                        <ListItem
                                            key={page.name}
                                            disablePadding
                                            component={Link}
                                            to={page.route}
                                            sx={{ color: "black" }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>{page.icon}</ListItemIcon>
                                                <ListItemText primary={page.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </SwipeableDrawer>
                    </Box>
                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        href='#app-bar-with-responsive-menu'
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        یادداشت ها
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                sx={{ my: 2, color: "white", display: "block" }}
                                component={Link}
                                to={page.route}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Typography>{firstName + " " + lastName}</Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
