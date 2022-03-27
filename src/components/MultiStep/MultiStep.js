import React, { useEffect, useState } from 'react';
import { css, styled, setup } from 'goober';
import { Button } from '..';
import './MultiStep.scss';

setup(React.createElement);

const Ol = styled('ol')`
  margin: 0;
  padding-bottom: 2.2rem;
  list-style-type: none;
`;
const Li = styled('li')`
  display: inline-block;
  text-align: center;
  line-height: 4.8rem;
  padding: 0 0.7rem;
  cursor: pointer;
  color: silver;
  border-bottom: 2px solid silver;
  &:hover,
  &:before {
    color: #0fa0ce;
  }
  &:after {
    content: '\\00a0\\00a0';
  }
  span {
    padding: 0 1.5rem;
  }
  &:before {
    position: relative;
    float: left;
    left: 50%;
    width: 1.2em;
    line-height: 1.4em;
    border-radius: 0;
    bottom: -3.99rem;
  }
`;

const Todo = css`
  &:before {
    content: '\u039F';
    color: silver;
    background-color: white;
  }
`;
const Doing = css`
  &:before {
    content: '\u2022';
    color: white;
    background-color: #33c3f0;
  }
`;
const Done = css`
  &:before {
    content: '\u2713';
    color: white;
    background-color: #33c3f0;
  }
`;

const getStep = (defaultIndex, newIndex, length) => {
  if (newIndex <= length) {
    return newIndex;
  }
  return defaultIndex;
};

const getTopNavStyles = (indx, length) => {
  const styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done');
    } else if (i === indx) {
      styles.push('doing');
    } else {
      styles.push('todo');
    }
  }
  return styles;
};

const getButtonsState = (indx, length) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true
    };
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true
    };
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false
    };
  }
};

const MultiStep = ({
  activeStep,
  showNavigation,
  steps,
  prevStyle,
  nextStyle,
  activeComponentClassName,
  inactiveComponentClassName,
  handleSubmit
}) => {
  const showNav = typeof showNavigation === 'undefined' ? true : showNavigation;

  const [startingStep] = useState(getStep(0, activeStep, steps.length));
  const [stylesState, setStyles] = useState(
    getTopNavStyles(startingStep, steps.length)
  );
  const [compState, setComp] = useState(startingStep);
  const [buttonsState, setButtons] = useState(
    getButtonsState(startingStep, steps.length)
  );

  useEffect(() => {
    setStepState(activeStep);
  }, [activeStep]);

  const setStepState = (indx) => {
    setStyles(getTopNavStyles(indx, steps.length));
    setComp(indx < steps.length ? indx : compState);
    setButtons(getButtonsState(indx, steps.length));
  };

  const next = () => {
    let stepRef = steps[compState]?.component?.ref?.current || null;
    if (compState === 0) {
      if (stepRef && stepRef.validateFields(stepRef.data))
        setStepState(compState + 1);
      else stepRef.updateStore(stepRef.data);
    } else {
      setStepState(compState + 1);
    }
    stepRef.updateStore(stepRef.data);
  };

  const previous = () =>
    setStepState(compState > 0 ? compState - 1 : compState);

  const renderSteps = () =>
    steps.map((s, i) => {
      const { name } = s;
      if (stylesState[i] === 'todo') {
        return (
          <Li className={Todo} key={i} value={i}>
            <span>{name}</span>
          </Li>
        );
      } else if (stylesState[i] === 'doing') {
        return (
          <Li className={Doing} key={i} value={i}>
            <span>{name}</span>
          </Li>
        );
      } else {
        return (
          <Li className={Done} key={i} value={i}>
            <span>{name}</span>
          </Li>
        );
      }
    });

  const renderNav = (show) =>
    show && (
      <div className="buttons-wrapper">
        <div
          style={buttonsState.showPreviousBtn ? prevStyle : { display: 'none' }}
        >
          <Button buttonText="Previous" handleClick={previous} />
        </div>
        <div style={buttonsState.showNextBtn ? nextStyle : { display: 'none' }}>
          <Button buttonText="Next" handleClick={next} />
        </div>
        <div
          style={
            compState === steps.length - 1 ? nextStyle : { display: 'none' }
          }
        >
          <Button buttonText="Submit" handleClick={handleSubmit} />
        </div>
      </div>
    );

  return (
    <div className="multistep-wrapper">
      <Ol>{renderSteps()}</Ol>
      {inactiveComponentClassName ? (
        steps.map((step, index) => {
          const className =
            index === compState
              ? activeComponentClassName
              : inactiveComponentClassName;
          return (
            <div className={className} key={index}>
              {step.component}
            </div>
          );
        })
      ) : (
        <div>{steps[compState].component}</div>
      )}
      <div>{renderNav(showNav)}</div>
    </div>
  );
};

export default React.memo(MultiStep);
