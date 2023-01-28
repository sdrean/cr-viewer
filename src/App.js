import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {Alert, Button, Chip, Grid, List, ListItem, makeStyles, TextField} from "@mui/material";
import {apiPost} from "./Utils";
import {ArrowCircleRight as ArrowCircleRightIcon, EmojiEvents, RefreshRounded} from '@mui/icons-material';


function App() {
    const [search,setSearch] = useState('')
    const [players,setPlayers] = useState(null)
    const [opponent,setOpponent] = useState(null)
    const [error,setError] = useState('')

    const handleClick = (event) => {
        setError('')
        let param = {q: search}
        apiPost('https://sdsh.w3cloud.fr/cr/find', param)
            .then(data => {
                if(data.valid){
                    setPlayers(data.data)
                } else {
                    setError(data.error)
                }
            })
    }

    const handleSelectedPlayer = (player) => {
        setError('')
        apiPost('https://sdsh.w3cloud.fr/cr/current-deck', player)
            .then(data => {
                if(data.valid){
                    setOpponent({
                        cards: data.cards,
                        player: data.player
                    })
                } else {
                    setError(data.error)
                }
            })
    }

    return (
        <Grid container className="App-container" style={{background: "url(arene.jpg)", backgroundSize: 'cover'}}>
            {
                opponent !== null ?
                    <>
                        <Grid item xs={11} className="playerToolBar" style={{backgroundColor: '#666',fontSize: 30, padding: 20, color: 'white'}}>
                            <b style={{fontSize: 60,paddingRight: 50}}>{opponent.player.name}</b>
                            <i>{opponent.player.clan}</i>
                            <Chip
                                style={{fontSize: 30, color: 'white', marginLeft: 40, padding: 20}}
                                avatar={<EmojiEvents style={{color: 'white',fontSize: 30}} />}
                                label={opponent.player.trophies}
                            />
                        </Grid>
                        <Grid item xs={1} className="playerToolBar" style={{backgroundColor: '#666',padding: 20}}>
                            <Button onClick={(e) => {
                                setOpponent(null)
                            }
                            }>
                                <RefreshRounded style={{color: 'white', fontSize: 60}} />
                            </Button>
                        </Grid>
                    </>:
                    null
            }
            <Grid item xs={12}>
                <Grid container className={players === null ? 'App-header': 'App-header-list'}>
                    {
                        opponent === null ?
                            <>
                                <Grid item xs={1}>&nbsp;</Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        style={{backgroundColor: 'white', fontSize: 40}}
                                        value={search}
                                        fullWidth={true}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                        onKeyPress={(e) => {
                                            console.log(e)
                                            if(e.key === 'Enter'){
                                                handleClick(e)
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        style={{padding: '15px 10px',marginLeft: 4}}
                                        onClick={handleClick}
                                    >
                                        <ArrowCircleRightIcon />
                                    </Button>
                                </Grid>
                                <Grid item xs={1}>&nbsp;</Grid>
                            </>:
                            null
                    }
                    {
                        error !== '' ?
                            <Grid item xs={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>:
                            null
                    }
                    {
                        players !== null && players.length > 0 && opponent === null ?
                            <>
                                <Grid item xs={1}>&nbsp;</Grid>
                                <Grid item xs={10}>
                                    <List style={{backgroundColor: 'white'}}>
                                        {
                                            players.map((player,index) => {
                                                return (
                                                    <ListItem
                                                        key={index}
                                                        onClick={
                                                            (e) => {
                                                                handleSelectedPlayer(player)
                                                            }
                                                        }
                                                        style={{cursor: 'pointer'}}
                                                    >
                                                        <b>{player.player}</b> ( {player.clan} )
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </List>
                                </Grid>
                                <Grid item xs={1}>&nbsp;</Grid>
                            </>:
                            null

                    }
                    {
                        opponent !== null ?
                            <Grid item xs={12}>
                                <Grid container>
                                    {
                                        opponent.cards.map((card,index) => {
                                            return(
                                                <Grid item xs={3} key={index} style={{textAlign: 'center'}}>
                                                    <img src={card.iconUrls.medium} />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>:
                            null
                }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
