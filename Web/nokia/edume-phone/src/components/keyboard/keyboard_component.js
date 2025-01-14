import Key_0 from "../../images/nokia/num_keys/0_btn.svg";
import Key_1 from "../../images/nokia/num_keys/1_btn.svg";
import Key_2 from "../../images/nokia/num_keys/2_btn.svg";
import Key_3 from "../../images/nokia/num_keys/3_btn.svg";
import Key_4 from "../../images/nokia/num_keys/4_btn.svg";
import Key_5 from "../../images/nokia/num_keys/5_btn.svg";
import Key_6 from "../../images/nokia/num_keys/6_btn.svg";
import Key_7 from "../../images/nokia/num_keys/7_btn.svg";
import Key_8 from "../../images/nokia/num_keys/8_btn.svg";
import Key_9 from "../../images/nokia/num_keys/9_btn.svg";
import Hash_key from "../../images/nokia/hash_btn.svg";
import Star_btn from "../../images/nokia/star_btn.svg";
import { Button, Grid } from "@material-ui/core";
import React from "react";
import ScreenComponent from "../screen/screen_componet";
import Action_btn from "../../images/nokia/nokia_actionBtn.svg";
import "./keyboard_component.css";
import { useEffect } from "react";

// const apiURL = "http://localhost:8001/";
const apiURL = "http://motherload.td.org.uit.no:8001/";
const lockCharDelay = 600;
const one = ["1"];
const two = ["2", "a", "b", "c"];
const three = ["3", "d", "e", "f"];
const four = ["4", "g", "h", "i"];
const five = ["5", "j", "k", "l"];
const six = ["6", "m", "n", "o"];
const seven = ["7", "p", "q", "r", "s"];
const eight = ["8", "t", "u", "v"];
const nine = ["9", "w", "x", "y", "z"];
const zero = ["0", " "];
const star = ["*", "+"];
const hash = ["#"];

export default function NumberKeyPad() {
  const [msgId, setMsgId] = React.useState(null);
  const [btnCounter, setBtnCounter] = React.useState(0);
  const [currentActiveBtn, setCurrentActivebtn] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [timeoutId, setTimeoutId] = React.useState(-1);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const appendChar = (char) => {
    const str = message + char;
    setMessage(str);
  };

  const createTimeout = (btnVal) => {
    const timeoutId = setTimeout(() => {
      setBtnCounter(0);

      setCurrentActivebtn(null);
    }, lockCharDelay);
    setTimeoutId(timeoutId);
  };

  const resetTimeout = (btnVal) => {
    clearTimeout(timeoutId);
    createTimeout(btnVal);
  };

  const getNewMsgId = async (btnType, btnVal) => {
    const Msgresponse = await fetch(apiURL + "message/new");
    const json = await Msgresponse.json();
    setMsgId(json.message_id);
  };

  const resetMsg = () => {
    setErrorMsg("Error wrong code");
    setTimeout(() => {
      setErrorMsg(null);
    }, 2000);
    setBtnCounter(0);
    setMsgId(null);
    setMessage("");
  };

  const validateBtn = (btnVal) => {
    if (currentActiveBtn === null) {
      const char = btnVal[btnCounter % btnVal.length];
      const count = btnCounter + 1;
      setCurrentActivebtn(btnVal);
      setBtnCounter(count);
      appendChar(char);
    } else if (
      //
      currentActiveBtn === btnVal
    ) {
      const char = btnVal[btnCounter % btnVal.length];
      const count = btnCounter + 1;
      setBtnCounter(count);
      const str = message.slice(0, -1) + char;
      setMessage(str);
      //
    } else {
      if (message === "") {
        setMessage(btnVal[btnCounter % btnVal.length]);
      } else {
        clearTimeout(timeoutId);
        const str = message + btnVal[btnCounter % btnVal.length];
        setMessage(str);
      }

      setBtnCounter(1);
      setCurrentActivebtn(btnVal);
      const str = message + btnVal[0];
      setMessage(str);
    }
  };

  const clickBtn = (btnVal, btnType) => {
    if (msgId === null) {
      return;
    }

    resetTimeout(btnVal);
    fetch(apiURL + "button/" + btnType, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_id: msgId }),
    }).then((response) => {
      if (response.status !== 200) {
        resetMsg();
      }
    });
    validateBtn(btnVal);
  };

  const initMsg = () => {
    if (msgId === null) {
      getNewMsgId("init", one);
    }
  };

  const sendMsg = async () => {
    if (msgId === null || message === "") {
      initMsg();
      return;
    }
    const msg = await fetch(apiURL + "message/" + msgId);
    const json = await msg.json();
    console.log(json.message);

    const response = await fetch(apiURL + "message/" + msgId + "/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.text();

    if (response.status === 200) {
      setMessage(data);
    } else {
      resetMsg();
    }
  };

  useEffect(() => {}, [message]);

  return (
    <div>
      <div>
        <ScreenComponent
          text={message}
          sendMsg={sendMsg}
          msgId={msgId}
          errorMsg={errorMsg}
        />
      </div>
      <div className="phoneKeysDiv">
        <Grid
          className="actionButton"
          container
          justify="center"
          alignItems="center"
        >
          <img alt="" src={Action_btn} style={{}} />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Button
            onClick={() => {
              clickBtn(one, "1");
            }}
            size="small"
          >
            <img alt="" src={Key_1} />
          </Button>
          <Button
            onClick={() => {
              clickBtn(two, "2");
            }}
            size="small"
          >
            <img alt="" src={Key_2} />
          </Button>
          <Button
            onClick={() => {
              clickBtn(three, "3");
            }}
            size="small"
          >
            <img alt="" src={Key_3} />
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            onClick={() => {
              clickBtn(four, "4");
            }}
            size="small"
          >
            <img alt="" src={Key_4} />
          </Button>
          <Button
            onClick={() => {
              clickBtn(five, "5");
            }}
            size="small"
          >
            <img alt="" src={Key_5} />
          </Button>
          <Button
            onClick={() => {
              clickBtn(six, "6");
            }}
            size="small"
          >
            <img alt="" src={Key_6} />
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            onClick={() => {
              clickBtn(seven, "7");
            }}
            size="small"
          >
            <img alt="" src={Key_7} />
          </Button>
          <Button
            onClick={() => {
              clickBtn(eight, "8");
            }}
            size="small"
          >
            <img alt="" src={Key_8} />
          </Button>
          <Button
            onClick={() => {
              clickBtn(nine, "9");
            }}
            size="small"
          >
            <img alt="" src={Key_9} />
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Button onClick={() => clickBtn(star, "s")} size="small">
            <img alt="" src={Star_btn} />
          </Button>
          <Button onClick={() => clickBtn(zero, "0")} size="small">
            <img alt="" src={Key_0} />
          </Button>
          <Button onClick={() => clickBtn(hash, "h")} size="small">
            <img alt="" src={Hash_key} />
          </Button>
        </Grid>
      </div>
    </div>
  );
}
