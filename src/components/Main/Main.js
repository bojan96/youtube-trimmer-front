import { AppBar, Box, Button, Toolbar } from "@material-ui/core";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import styles from './Main.module.css';
// import './Main.css';


export default function Main() {

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Button
                        className={styles.toolbar_button}
                        variant="text"
                        component={NavLink}
                        activeClassName={styles.active}
                        exact={true}
                        to="/job/create">Trim</Button>
                    <Button
                        className={styles.toolbar_button}
                        variant="text"
                        component={NavLink}
                        activeClassName={styles.active}
                        exact={true}
                        to="/job">Trim jobs</Button>
                    <Button
                        className={`${styles.toolbar_right_align} ${styles.toolbar_button}`}
                        variant="text">Logout</Button>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/job/create">
                    <div style={{ marginTop: "200px" }}>Create job</div>
                </Route>
                <Route path="/job">
                    <div style={{ marginTop: "200px" }}>Jobs</div>
                </Route>
            </Switch>
        </Box>
    );
}