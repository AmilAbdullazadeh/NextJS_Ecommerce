import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PaymentIcon from '@material-ui/icons/Payment';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Typography, Divider } from '@components';

import useStyles from './Sidemenu.styles';

const Sidemenu: React.FC = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    const helpAndSettingsList = [
        {
            text: 'Language',
            icon: <LanguageIcon />,
        },
        {
            text: 'Account',
            icon: <AccountCircleIcon />,
        },
        {
            text: 'Payment Methods',
            icon: <PaymentIcon />,
        },
        {
            text: 'Contact Support',
            icon: <ContactSupportIcon />,
        },
    ];

    const MenuOptions: React.FC = () => (
        <div
            className={[classes.list, classes.fullList].join(' ')}
            role="presentation"
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
        >
            <div className={classes.menuHeader}>
                <Typography variant="body1" color="textSecondary">
                    Hello, Sign in
                </Typography>
            </div>
            <List dense>
                <ListItem>
                    <Typography className={classes.menuTitle}>
                        Technology
                    </Typography>
                </ListItem>
                {['Smartphones', 'Laptops', 'Tablets', 'Gaming', 'Gadgets'].map(
                    text => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
            <List dense>
                <ListItem>
                    <Typography className={classes.menuTitle}>
                        Help & Settings
                    </Typography>
                </ListItem>
                {helpAndSettingsList.map(({ text, icon }) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <>
                <IconButton
                    onClick={openDrawer}
                    data-testid="toggle-sidemenu-button"
                    aria-label="toggle menu"
                >
                    <MenuIcon color="secondary" />
                </IconButton>
                <SwipeableDrawer
                    anchor={'left'}
                    open={isOpen}
                    onClose={closeDrawer}
                    onOpen={openDrawer}
                >
                    <MenuOptions />
                </SwipeableDrawer>
            </>
        </div>
    );
};

export default Sidemenu;
