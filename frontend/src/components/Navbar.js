// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Mi Aplicación</Typography>
                <Button color="inherit" component={Link} to="/configuracion">Configuración</Button>
                <Button color="inherit" component={Link} to="/cuenta">Cuenta</Button>
                <Button color="inherit" component={Link} to="/quiz">Quiz</Button>
                <Button color="inherit" component={Link} to="/playlist">Playlist</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
