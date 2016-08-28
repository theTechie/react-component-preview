import React, {PropTypes} from 'react';

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea defaultValue={this.props.value} value={this.props.value} />
            </div>
        );
    }
}

TextArea.propTypes = {
    value: PropTypes.string
};

TextArea.defaultProps = {
    value: 'default text'
};
