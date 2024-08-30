import React, { Component } from 'react';
import OpenViduVideoComponent from './OpenViduVideoComponent';

export default class UserVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.handleVideoClicked = this.handleVideoClicked.bind(this); // 클릭 이벤트 핸들러 바인딩
    }

    // 닉네임 가져오기
    getNicknameTag() {
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    // 비디오 클릭 시 부모 컴포넌트에 알림
    handleVideoClicked(event) {
        if (this.props.mainVideoStream) {
            this.props.mainVideoStream(this.props.streamManager);
        }
    }

    render() {
        return (
            <div className="streamcomponent" onClick={this.handleVideoClicked}>
                {/* OpenViduVideoComponent를 사용하여 비디오 스트림 표시 */}
                <OpenViduVideoComponent streamManager={this.props.streamManager} />
                {/* 사용자 닉네임 표시 */}
                <div><p>{this.getNicknameTag()}</p></div>
            </div>
        );
    }
}
