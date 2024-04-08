import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const Component = styled.div`
    background: #F5F5F5;
`;

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      
    [{ 'indent': '-1'}, { 'indent': '+1' }],          
    [{ 'direction': 'rtl' }],                         
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         
];
  

const Editor = () => {
    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        //console.log('Setting up Quill');
        const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions }});
        quillServer.disable();
        quillServer.setText('Loading the document...')
        setQuill(quillServer);
    }, []);

    useEffect(() => {
        //console.log('Setting up Socket');
        const socketServer = io('https://doc-sharing-app-production.up.railway.app');
        setSocket(socketServer);

        return () => {
            //console.log('Disconnecting Socket');
            socketServer.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socket === null || quill === null) return;

        //console.log('Setting up text-change event listener');
        const handleChange = (delta, oldData, source) => {
            if (source !== 'user') return;

            socket.emit('send-changes', delta);
            //console.log(delta);
        }

        quill.on('text-change', handleChange);

        return () => {
            //console.log('Cleaning up text-change event listener');
            quill.off('text-change', handleChange);
        }
    }, [quill, socket]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta) => {
            //console.log('Setting up receive-changes event listener');
            //console.log(delta);
            quill.updateContents(delta);
        }

        socket.on('receive-changes', handleChange);

        return () => {
            //console.log('Cleaning up receive-changes event listener');
            socket.off('receive-changes', handleChange);
        }
    }, [socket]);

    useEffect(() => {
        if (quill === null || socket === null) return;

        //console.log('Setting up load-document event listener');
        socket.once('load-document', document => {
            quill.setContents(document);
            quill.enable();
        })

        socket.emit('get-document', id);

        return () => {
            //console.log('Cleaning up load-document event listener');
        };
    }, [quill, socket, id]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        //console.log('Setting up auto-save interval');
        const interval = setInterval(() => {
            //console.log('Auto-save');
            socket.emit('save-document', quill.getContents());
        }, 2000);

        return () => {
            //console.log('Cleaning up auto-save interval');
            clearInterval(interval);
        };
    }, [socket, quill]);

    return (
        <Component>
            <Box className='container' id='container'></Box>
        </Component>
    );
};

export default Editor;
