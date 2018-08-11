import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'
import { PostData } from '../../main/components/PostData'
import { Layout } from 'antd'
import { Carousel } from 'antd'
import { Rate } from 'antd'
import { Tooltip, Button, Radio, Icon } from 'antd'
import Like from './Like'
const { Content } = Layout

// import { Avatar, Badge } from 'antd';
// import 'antd/dist/antd.css';
// import { Progress } from 'antd';
// import { Alert } from 'antd';
// import { Tag } from 'antd';
// import { Carousel } from 'antd';
// import { Badge } from 'antd';
// import { Upload, Icon, Modal } from 'antd';
// import { Rate } from 'antd';
// import { DatePicker } from 'antd';

class ProfileContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curentUserId: '',
			target: ''
		}
	}

	componentWillMount(){
		console.log("in profile")
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			if (user.userLogin !== '')
			{
				PostData('user/getGuestInfo', {uId: user.userId, target: this.props.target.params.id}).then((res) => {
					this.setState({
						curentUserId: user.userId,
						target: this.props.target.params.id,
						tLogin: res.userData.login,
						tFName: res.userData.fname,
						tLName: res.userData.lname,
						tAge: res.userData.age,
						tSex: res.userData.sex,
						tSexPref: res.userData.sexPref,
						tAvatar: res.userData.profilePic,
						tAllPics: res.userPhoto,
						tIsOnline: res.userData.isOnline,
						tLastSeen: res.userData.lastSeen,
						tBio: res.userData.bio,
						tTags: res.userData.tags,
						tStars: res.userData.stars
					})
				})
			}
		}
	}

	render(){
		console.log("in profile state: ", this.state.tStars)
		const tags = (this.state.tTags != undefined && this.state.tTags.length != 0) ? this.state.tTags.split(" ") : this.state.tTags
		return(
			<Layout>
				<Content>
					<div className="my-carousel">
						<Carousel>
							{(this.state.tAllPics != undefined && this.state.tAllPics.length != 0) ?
								this.state.tAllPics.map((img, i) => (
								<div key={i}>
									<img src={img}/>
								</div>))
								:
								null
							}
						</Carousel>
					</div>
					<div className="targetDescription">
						<h2 className="targetDescription-name">{this.state.tFName} {this.state.tLName}, </h2>
						<h2 className="targetDescription-age">{this.state.tAge}</h2>
						<div className="targetDescription-info">
							<p>1992.6 km away</p>
							<p>{this.state.tSexPref}, {this.state.tSex}</p>
							<p>Last visit: {this.state.tLastSeen}</p>
						</div>
						<p className="targetBio">{this.state.tBio}</p>
						<Rate allowHalf disabled defaultValue={this.state.tStars} style={{marginBottom: "10px"}}/>
						<div className="targetTags">
							<h2>Tags:</h2>
							<div className="targetTags-holder">
								{tags != undefined && tags.lenth != 0 ? 
									tags.map((tag) => (<p key={tag.toString()} className="targetTags-single">{tag}</p>))
									:
									<p className="targetTags-single">{tags}</p>
								}
							</div>
						</div>
						<Button.Group size="large" className="my-card-width">
							<Like who={this.state.curentUserId} target={this.props.target.params.id}/>
							<Tooltip placement="topLeft" title="Never show me">
								<Button type="primary" className="target-btn">
									<Icon type="close-circle-o" />
								</Button>
							</Tooltip>
							<Tooltip placement="topLeft" title="Report scammer">
								<Button type="primary" className="target-btn">
									<Icon type="user-delete" />
								</Button>
							</Tooltip>
						</Button.Group>
					</div>
				</Content>
			</Layout>
		)
	}
}

export default ProfileContent;