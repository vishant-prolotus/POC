geth --datadir /home/himanshu/privatechain --rpc --rpcaddr "localhost" --rpcapi "db,net,web3,admin,eth,miner,personal" --rpccorsdomain "http://localhost:3000"

start mongo (if mongod service not running <systemctl start mongod>)

geth --datadir /home/studentrecord/privatechain --networkid 2115 --rpc --rpcaddr "0.0.0.0" --rpcapi "db,net,web3,admin,eth,miner,personal" --rpccorsdomain "http://52.54.54.227:3000"

ToDO

<!--* createAccount-->
<!--* addUniversity-->
<!--* approve university-->
* add record
* find added record address
* find a way to get record