import React, { useState } from 'react'
import styles from "./Calculator.module.css"

const Calculator = () => {
    const [result,setResult]=useState()
    const [expression,setExp]=useState("")
    
    const handleButton=(value)=>{
        if(value==='C')
        {
            setExp("")
            setResult()
        }
        else
         {
            setExp(expression+value)
        }
    }

    const evaluate=(expression)=>
    {
        if(expression.length===0)
        {return setResult("Error")}
        let tokens = expression.split('');
  
         // Stack for numbers: 'values'
        let values = [];
  
        // Stack for Operators: 'ops'
        let ops = [];
  
        for (let i = 0; i < tokens.length; i++)
        {
             // Current token is a whitespace, skip it
            if (tokens[i] == ' ')
            {
                continue;
            }
  
            // Current token is a number,
            // push it to stack for numbers
            if (tokens[i] >= '0' && tokens[i] <= '9')
            {
                let sbuf = "";
                  
                // There may be more than
                // one digits in number
                while (i < tokens.length &&
                        tokens[i] >= '0' &&
                            tokens[i] <= '9')
                {
                    sbuf = sbuf + tokens[i++];
                }
                values.push(parseInt(sbuf, 10));
                  i--;
            }
            else if (tokens[i] == '+' ||
                     tokens[i] == '-' ||
                     tokens[i] == '*' ||
                     tokens[i] == '/')
            {
            
                while (ops.length > 0 &&
                         hasPrecedence(tokens[i],
                                     ops[ops.length - 1]))
                {
                  values.push(handleOp(ops.pop(),
                                   values.pop(),
                                 values.pop()));
                }
  
                // Push current token to 'ops'.
                ops.push(tokens[i]);
            }
        }
        while (ops.length > 0)
        {
            values.push(handleOp(ops.pop(),
                             values.pop(),
                            values.pop()));
        }
  

        setResult(values[0])
        return values.pop();
    }
  
    // Returns true if 'op2' has
    // higher or same precedence as 'op1',
    // otherwise returns false.
    const hasPrecedence=(op1, op2)=>
    {
        if ((op1 == '*' || op1 == '/') &&
               (op2 == '+' || op2 == '-'))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    const handleOp=(op, b, a)=>
    {
        switch (op)
        {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if(a===0 && b===0)
            {
                 return NaN
                }
           else if (b == 0)
            {
                return Infinity
            }
           
           return parseFloat(a / b, 10);
        }
        return 0;
    }
  return (
    <div>
        <h1>React Calculator</h1>

        <input type="text" value={expression} onChange={(e)=> setExp(e.target.value)}/>
        <div>{result}</div>
      <div className={styles.wrapper}>
      <div>
            <button className={styles.button} onClick={(e)=>handleButton(7)}>7</button>
            <button className={styles.button} onClick={(e)=>handleButton(8)}>8</button>
            <button className={styles.button} onClick={(e)=>handleButton(9)}>9</button>
            <button className={styles.button} onClick={(e)=>handleButton("+")}>+</button>

        </div>
        <div>
            <button className={styles.button} onClick={(e)=>handleButton(4)}>4</button>
            <button className={styles.button} onClick={(e)=>handleButton(5)}>5</button>
            <button className={styles.button} onClick={(e)=>handleButton(6)}>6</button>
            <button className={styles.button} onClick={(e)=>handleButton('-')}>-</button>

        </div>
        <div>
            <button className={styles.button} onClick={(e)=>handleButton(1)}>1</button>
            <button className={styles.button} onClick={(e)=>handleButton(2)}>2</button>
            <button className={styles.button} onClick={(e)=>handleButton(3)}>3</button>
            <button className={styles.button} onClick={(e)=>handleButton("*")}>*</button>

        </div>
        <div>
            <button className={styles.button} onClick={(e)=>handleButton("C")}>C</button>
            <button className={styles.button} onClick={(e)=>handleButton(0)}>0</button>
            <button className={styles.button} onClick={(e)=>evaluate(expression)}>=</button>
            <button className={styles.button} onClick={(e)=>handleButton("/")}>/</button>

        </div>
      </div>
       

       
      
    </div>
  )
}

export default Calculator
