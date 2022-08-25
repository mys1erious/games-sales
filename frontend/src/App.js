import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App() {
    const [data, setData] = useState('');

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const getData = async() => {
        let response = await axios.get('http://localhost/api/testumba/list/');
        let resData = await response.data;
        setData(transformData(resData));
    };

    const transformData = (data) => {
        for(let item of data){
            item['name'] = `${item['name']} ${item['surname']}`;
            delete item['surname'];
        }
        return data;
    };

    const dataRender = () => {
        return (
            <div>
                <h2>Data:</h2>
                {data.map((item, i) => <div key={i}>{item['name']}</div>)}
            </div>
        );
    };

    return (
        <React.Fragment>
            <div>Hello world</div>
            {
                data ? (dataRender())
                    : (<div>data loading</div>)
            }
        </React.Fragment>
    );
}

export default App;
