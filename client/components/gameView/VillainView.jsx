import React, { Component } from 'react';

class VillainView extends Component {
    render() {
        return (
            <div className="villain">
                <div>
                    <img src={this.props.currentState.villain.imageUrl} className="charIcon" />
                    <div className="info">
                        <h2 className="heroInfo">{this.props.currentState.villain.name} HP: {this.props.currentState.villain.hp} / {this.props.currentState.villain.maxHp} </h2>
                        <div className="vertAlign row" >
                            <img className="icon vertAlign leftMargin" src="https://www.shareicon.net/data/256x256/2015/10/29/663524_protection_512x512.png" /> {this.props.currentState.villain.decreaseDamage}
                            <img className="icon vertAlign leftMargin" src="https://i.pinimg.com/originals/15/0a/37/150a3789a76da89757c28a15c764a5ae.png" /> {this.props.currentState.villain.increaseDamage}
                        </div>
                    </div>
                </div>
                {/* <div className="col deck" >
                    <img src="https://i.imgur.com/Mpcg57S.jpg" height="150" width="100" />
                </div> */}

                <style>
                    {`
                        .villain {
                            border: solid black;
                            border-width: 10px;
                            background-image: url("https://i.pinimg.com/originals/66/d1/d9/66d1d9e627359a830bf70f57b36f2c9b.jpg");
                            background-size: 100%;
                        }
                        .heroInfo  {
                            display: inline;
                            padding-left: 20px;
                        }
                        .playerName {
                            display: inline;
                        }
                        
                        .deck {
                            float: right;
                            margin: 10px;
                        }
                        .cards {
                            border: solid 1px;
                            border-radius: 5px;
                            margin: 2px;
                        }
                        .charIcon {
                            height: 200px;
                            width: 200px;
                            border: solid 3px;
                            border-radius: 50%;
                        }
                        .info {
                            font-family: "Bangers";
                            letter-spacing: 1.5px;
                            color: black;
                        }
                    `}
                </style>
            </div>      
        );
    }

}
export default VillainView;
