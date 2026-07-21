import { useAccountsLogs } from "../store";
import { Box, Card, CardContent, Button, Typography } from '@mui/material';
import { useParams } from "react-router-dom";

const DetailUser = () => {
    const accounts = useAccountsLogs();
    const id = useParams().id;
    const account = accounts.find((n) => n.id === id);
    if (!account) {
        return <div>Loading. Please return to homepage before refreshing</div>;
    }
    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        <b>{account.name}</b> a.k.a. {account.username}
                    </Typography>
                    <Typography variant="h6" component="div">Poster of:</Typography>
                    <Typography variant="body1" component="div">
                        <ul>
                            {(account.blogs.length) === 0 ? "Nothing, lol." : account.blogs.map((blog) => (
                                <li key={blog.id}>{blog.title}</li>
                                ))}
                        </ul>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default DetailUser;
