import * as React from "react";

const iconcolor = "var(--dark-clr)";

const icons = {
  plus: (
    <>
      <path d="M11 4H9V9H4V11H9V16H11V11H16V9H11V4Z" fill={iconcolor} />
    </>
  ),
  upload: (
    <>
      <path
        d="M5 9.00001L9.3753 5.49977C9.74052 5.2076 10.2595 5.2076 10.6247 5.49977L15 9.00001M10 6.00001V12M5 15H15"
        stroke={iconcolor}
        stroke-width="2"
      />
    </>
  ),
  save: (
    <>
      <path
        d="M15 11L10.6247 14.5002C10.2595 14.7924 9.74052 14.7924 9.3753 14.5002L5 11M10 8V15M15 8V7C15 5.89543 14.1046 5 13 5H7C5.89543 5 5 5.89543 5 7V8"
        stroke={iconcolor}
        stroke-width="2"
      />
    </>
  ),
  tick: (
    <>
      <path
        d="M15 7L9.66759 13.9806C9.27228 14.4981 8.4957 14.5057 8.09032 13.9961L5 10.1111"
        stroke={iconcolor}
        stroke-width="2"
      />
    </>
  ),
  bin: (
    <>
      <path
        d="M8 5H12M13.1172 15H6.88278C6.37846 15 5.95306 14.6245 5.8905 14.124L5 7H15L14.1095 14.124C14.0469 14.6245 13.6215 15 13.1172 15Z"
        stroke={iconcolor}
        stroke-width="2"
      />
    </>
  ),
  fold: (
    <>
      <path
        d="M15 8L10.5958 12.3011C10.2006 12.6871 9.56733 12.6795 9.18149 12.2842L5 8"
        stroke={iconcolor}
        stroke-width="2"
      />
    </>
  ),
  lock: (
    <>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 5C2 3.34315 3.34315 2 5 2C6.65685 2 8 3.34315 8 5V6H2V5ZM0 7V5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5V7V11C10 11.5523 9.55229 12 9 12H1C0.447716 12 0 11.5523 0 11V7ZM8 8V10H2V8H8Z"
        fill={iconcolor}
      />
    </>
  ),
  unlock: (
    <>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 8C8 6.89543 8.89543 6 10 6H10.5C11.8807 6 13 7.11929 13 8.5V10H6C5.44772 10 5 10.4477 5 11V15C5 15.5523 5.44772 16 6 16H14C14.5523 16 15 15.5523 15 15V11V8.5C15 6.01472 12.9853 4 10.5 4H10C7.79086 4 6 5.79086 6 8H8ZM13 12V14H7V12H13Z"
        fill={iconcolor}
      />
    </>
  ),
  cross: (
    <>
      <path
        d="M14.9498 6.46445L13.5356 5.05023L10.0001 8.58575L6.46453 5.05023L5.05032 6.46445L8.58584 9.99997L5.05029 13.5355L6.46451 14.9497L10.0001 11.4142L13.5356 14.9497L14.9498 13.5355L11.4143 9.99997L14.9498 6.46445Z"
        fill={iconcolor}
      />
    </>
  )
};

export default icons;
