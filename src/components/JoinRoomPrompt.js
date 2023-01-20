import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import styles from '../styles/styles';
import withWindowDimensions, {windowDimensionsPropTypes} from './withWindowDimensions';
import reportPropTypes from '../pages/reportPropTypes';
import * as Report from '../libs/actions/Report';
import Avatar from './Avatar';
import Button from './Button';
import * as ReportUtils from '../libs/ReportUtils';
import CONST from '../CONST';
import compose from '../libs/compose';
import withLocalize, {withLocalizePropTypes} from './withLocalize';

const propTypes = {
    /** Report object for the current report */
    report: reportPropTypes,

    /** The policies which the user has access to and which the report could be tied to */
    policies: PropTypes.shape({
        /** Name of the policy */
        name: PropTypes.string,
    }),

    /** Offline status */
    isOffline: PropTypes.bool.isRequired,

    ...windowDimensionsPropTypes,

    ...withLocalizePropTypes,
};

const defaultProps = {
    report: {reportID: '0'},
    policies: {},
};

const JoinRoomPrompt = (props) => {
    const icons = ReportUtils.getIcons(props.report);
    const subtitle = `${ReportUtils.getChatRoomSubtitle(props.report, props.policies)} - ${props.report.participants.length} member${props.report.participants.length > 1 ? 's' : ''}`;

    return (
        <View style={styles.joinRoomPromptContainer}>
            <View style={[styles.dFlex, styles.flexRow, styles.flex1]}>
                <Avatar
                    source={icons[0]}
                    size={CONST.AVATAR_SIZE.MEDIUM}
                    containerStyles={[styles.mr3]}
                />
                <View style={styles.joinRoomPromptTextContainer}>
                    <Text style={[styles.textHeadline]} numberOfLines={1}>
                        {props.report.displayName}
                    </Text>
                    <Text
                        style={[
                            styles.sidebarLinkText,
                            styles.optionAlternateText,
                            styles.textLabelSupporting,
                        ]}
                    >
                        {subtitle}
                    </Text>
                </View>
            </View>
            <View style={styles.joinRoomPromptButtonContainer}>
                <Button
                    innerStyles={[styles.joinRoomButton]}
                    text={props.translate('common.details')}
                    textStyles={[styles.joinRoomButtonText]}
                    // onPress={event => }
                />
                <Button
                    success
                    innerStyles={[styles.joinRoomButton]}
                    text={props.translate('joinRoomPrompt.joinRoom')}
                    textStyles={[styles.joinRoomButtonText]}
                    onPress={() => Report.joinWorkspaceRoom(props.report.reportID)}
                    pressOnEnter
                />
            </View>
        </View>
    );
};

JoinRoomPrompt.displayName = 'JoinRoomPrompt';
JoinRoomPrompt.propTypes = propTypes;
JoinRoomPrompt.defaultProps = defaultProps;

export default compose(
    withWindowDimensions,
    withLocalize,
)(JoinRoomPrompt);