import React, { Component } from "react";

import "../style/Tip.css";

interface State {
  compact: boolean;
  text: string;
}

interface Props {
  onConfirm: (comment: { text: string; }) => void;
  onOpen: () => void;
  onUpdate?: () => void;
  defaultText?: string;
  compact?: boolean;
}

export class Tip extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      compact: props.compact || true,
      text: "",
    };
  }

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen, defaultText } = this.props;
    const { compact, text } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          <div
            className="Tip__compact"
            onClick={() => {
              onOpen();
              this.setState({ compact: false });
            }}
          >
            Annotate
          </div>
        ) : (
          <form
            className="Tip__card"
            onSubmit={(event) => {
              event.preventDefault();
              onConfirm({ text: defaultText || text });
            }}
          >
            <div>
              <textarea
                placeholder="Your comment"
                autoFocus
                value={defaultText || text}
                onChange={(event) =>
                  this.setState({ text: event.target.value })
                }
                ref={(node) => {
                  if (node) {
                    node.focus();
                  }
                }}
              />
            </div>
            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Tip;
