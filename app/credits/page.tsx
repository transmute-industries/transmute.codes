
import Theme from "@/components/Theme"
import AppDrawer from "@/components/AppDrawer"
import * as React from 'react';
import Particles from '@/components/Particles'

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


export default function Home() {
  return (
    <Theme>
      <AppDrawer title={'Credits'}>
        <Paper sx={{p: 2}}>
          <List>

          <ListItem secondaryAction={
              <IconButton edge="end" aria-label="git repo" href="https://github.com/cberner/raptorq" target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon />
              </IconButton>
            }
            >
              <ListItemAvatar>
                <Avatar>
                  <GitHubIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="raptorq" secondary="Nov 26, 2023" />
            </ListItem>

            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="git repo" href="https://github.com/ALI1416/qrcode-encoder-js" target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon />
              </IconButton>
            }
            >
              <ListItemAvatar>
                <Avatar>
                  <GitHubIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="qrcode-encoder-js" secondary="Jul 19, 2023" />
            </ListItem>

            
            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="rfc" href="https://datatracker.ietf.org/doc/RFC9285" target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon />
              </IconButton>
            }
            >
              <ListItemAvatar>
                <Avatar>
                  <NewspaperIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="RFC9285" secondary="August 08, 2022" />
            </ListItem>
           

            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="rfc" href="https://datatracker.ietf.org/doc/RFC6330" target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon />
              </IconButton>
            }
            >
              <ListItemAvatar>
                <Avatar>
                  <NewspaperIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="RFC6330" secondary="Jun 03, 2020" />
            </ListItem>
            


            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="rfc" href="https://datatracker.ietf.org/doc/RFC5053" target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon />
              </IconButton>
            }
            >
              <ListItemAvatar>
                <Avatar>
                  <NewspaperIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="RFC5053" secondary="Dec 12, 2018" />
            </ListItem>
            
          </List>
        </Paper>
        <Particles />
      </AppDrawer>
    </Theme>

  )
}
