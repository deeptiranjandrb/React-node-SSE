import React,{useState, useEffect} from 'react'

function EventSourceComponent() {
    const [text, setText] = useState('');

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/events');
        eventSource.onmessage = (e) => {
            setText(prevText => prevText + ' ' + e.data);
        }
        return () => eventSource.close();
    },[]);
  return (
    <div><p>{text}</p></div>
  )
}

export default EventSourceComponent