import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Slider as SliderDHX } from "dhx-suite";
import "dhx-suite/codebase/suite.min.css";

function Slider(props) {
  const elRef = useRef(null);

  useEffect(() => {
    const slider = new SliderDHX(elRef.current, props);
    return () => slider.destructor();
  }, [props]);

  return <div style={{ width: "600px" }} ref={elRef}></div>;
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  mode: PropTypes.oneOf(["vertical", "horizontal"]),
  range: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
  inverse: PropTypes.bool,
  tooltip: PropTypes.bool,
  css: PropTypes.string,
  tick: PropTypes.number,
  tickTemplate: PropTypes.func,
  majorTick: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  labelPosition: PropTypes.string,
  labelWidth: PropTypes.string,
  hiddenLabel: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Slider;
