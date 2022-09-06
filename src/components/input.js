import { useId, useState } from 'react';

export function InputButton(props) {
  const [input, setInput] = useState(props?.value ?? '');
  return (
    <div>
    <label htmlFor={props?.id}>{props?.label ?? ''}</label>
    <input id={props?.id} value={input} onInput={e => setInput(e.target.value)}/>
    </div>
  );
}