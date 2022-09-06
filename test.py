import requests

url = 'https://thentic.tech/api/nfts/contract'
headers = {'Content-Type': 'application/json'}
data = {'key': 'cV6mJue3HyTEEV5FLxSNhef4paljo8tG',
        'chain_id': '97',
        'name': '<Name for your NFT contract>', 
        'short_name': '<Short Name for NFT contract>'}

#creates NFT contract on BNB testnet
r = requests.post(url, json=data, headers=headers)
print(r.text)