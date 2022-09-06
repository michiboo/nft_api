import React, { useState, useEffect } from 'react';
import {InputButton} from './input';

export function CreateNFT() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [requestId, setRequestId] = useState(null);
    function updateContractList() {
        var arr = []
        const but_keys = ['but_key', "but_chainID", "but_name", "but_sname"]
        for(var i = 0; i < but_keys.length; i++)
        {   
            arr.push(document.getElementById(but_keys[i]).value)
        }
        fetch(`https://thentic.tech/api/contracts?key=${arr[0]}&chain_id=${arr[1]}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setContracts(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                    setError(error);
                }
            )
    }
    function call() {
        var arr = []
        const but_keys = ['but_key', "but_chainID", "but_name", "but_sname"]
        for(var i = 0; i < but_keys.length; i++)
        {   
            arr.push(document.getElementById(but_keys[i]).value)
        }
        console.log(`{"key":"${arr[0]}","chain_id":${arr[1]},"name":"${arr[2]}","short_name":"${arr[3]}"}`)
        const options = {
            method: 'POST',
            body: `{"key":"${arr[0]}","chain_id":${arr[1]},"name":"${arr[2]}","short_name":"${arr[3]}"}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch('https://thentic.tech/api/nfts/contract', options)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setItems(result);
                    updateContractList();

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        updateContractList();
    }, [])
    return (
        <div>
            <div>
                <button onClick={call}>
                    Create NFT
                </button>
                <InputButton label="Chain ID: " id="but_chainID"/>
                <InputButton label="Name: " id="but_name"/>
                <InputButton label="ShortName: " id="but_sname"/>
                <InputButton label="API KEY: " id="but_key" value="E7eUX6BBERNqn3gXOw4cIsRvXAVICYNK"/>
            </div>
            {items ? (
                <div>
                    Request ID: {items.request_id}
                    Request Status: {items.status}
                </div>
            ) : (
                <div>Loading.... </div>
            )}
            <div>
                {Array.isArray(contracts.contracts) ? (
                    <div>
                        <h3> Current contracts </h3>
                        <h4> Name , short Name, request ID,    chain_id, status,   transaction_url</h4>
                        <ul>
                            {contracts.contracts.map((value, index) => {
                                return <li key={index}>{value.name} {value.short_name} {value.request_id} {value.chain_id} {value.status} {value.transaction_url} </li>
                            })}
                        </ul>
                    </div>
                ) : (<div> Empty contracts
                    {/* {alert(contracts.keys())} */}
                    {console.log(Object.keys(contracts))}
                </div>)}
            </div>
        </div>
    )


}