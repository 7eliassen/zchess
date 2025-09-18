import "../styles/profile.scss"
function Profile() {
    return (
        <div className="profile-container">
                <button className="edit-profile-but">Edit profile</button>
                <div className="row-container">
                    <img src="/user-profile.svg"></img>
                    <div className="col-container">
                        <p>Username</p>
                        <p>Date of registration</p>
                    </div>

                </div>
                <div className="stats">
                    <p>ELO-raging: 1200</p>
                    <p>Played games: 77</p>
                    <p className="wins">Wins: 50</p>
                    <p className="loses">Loses: 20</p> 
                    <p className="draws">Draws: 7</p>
                    <p>Win rate: 64%</p>
                </div>
        </div>
    )
}

export default Profile