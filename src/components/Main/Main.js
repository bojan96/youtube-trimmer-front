import { AppBar, Box, Button, Toolbar } from "@material-ui/core";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import * as Auth from "../../api/Auth";
import Job from "../Job/Job";
import styles from './Main.module.css';


export default function Main({onLogout = () => {}}) {
    
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
                        onClick={() => {
                            Auth.logout();
                            onLogout();
                        }}
                        className={`${styles.toolbar_right_align} ${styles.toolbar_button}`}
                        variant="text">Logout</Button>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/job/create">
                    <Job className={`${styles.container_margin} ${styles.job_container}`}/>
                </Route>
                <Route path="/job">
                    <div style={{ marginTop: "200px" }}>Jobs</div>
                </Route>
            </Switch>
        </Box>
    );
}