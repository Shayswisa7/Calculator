import React  from'react';
import styled from 'styled-components';
import './ButtonOfCalculator.css';

//But is button for some of the calculator buttons.
const But = styled.button`
 background-color: rgb(88, 97, 97);
 border-radius: 160px ;
 color: white;
 height: 35px;
 width: 82px;
 `
 const numbers = [7,8,9,4,5,6,1,2,3];
 const chars= ["+","-","0","*","/",'=',"(",")","."];
 var flag=true;                                     //flag for claer state.string.
 var play=false;                                     //play, gives access to all functions.                           
 var flag1=false;                                   //flag1, Clearing a string after running an equal function.            
 var flag2=true; 

 var p = 0;
 var p1 = 0;
 var first1 = 0;
 var last = 0;
 var ch = 'A'; 

class ButtonsOfCalculator extends React.Component{
    state = {
        string : "",    //Display.
        string1 :"" //Previous view.

    }
    //hendel is the function of the buttons calculator.
    hendel=(x)=>{
        if(play)
        {
            if(!flag){
                 this.setState({string:""});
                 flag=true;
            }
            if(this.state.string.length<13){
                if (this.state.string === "0." && flag2)
                {
                    this.state.string="";
                }
                else {
                    flag2=true;
                }    
                if(!flag1)
                {
                    this.setState({string:this.state.string+x});
                }
                else if(flag1)
                {
                    this.setState({string:""});
                    this.setState({string:this.state.string+x});
                    flag1=false;
                }
                if(x==='.')
                    flag2=false;
            }
        }
    }
    //play , turns the calculator on and off.
    play=()=>{
        (play)? play=false:play=true;
        this.setState({string1:"0."});
        (play)? this.setState({string:"0."}):this.setState({string:""});

    }
    //string1 form stait except the value of stait.stirng for back.
    back =()=>{
        if(play)
        {
            flag1=false;
            this.setState({string: this.state.string1});
        }
    }
    //delOneChar delete one character.
    delOneChar =() =>{
        if(play)
        {
            //var c=this.state.string.substring(this.state.string.length-1); 
            if(this.state.string!=="0.")
            {
                this.setState({string:this.state.string.substring(0,this.state.string.length-1)});
            }
            if(this.state.string.length===1){
                 this.setState({string:"0."});
            }
        }
    }
    //clearDisplay back 0. to display.
    clearDisplay (){
        if(play)
        this.setState({string:"0."});
    }
    //isNumeric check if the st is number.
    isNumeric(st) {
        return !isNaN(parseFloat(st)) && isFinite(st);
    }
    //
    equal=()=>{
       if(play){
          this.setState({string1:this.state.string});
          flag1=true;
          const st= this.Sum(this.state.string);
          this.setState({string:(st.length>13)? st.substring(0,14):st});
       }     
    }
    /*
        console.log("opsitionPlus\nst: ",st);
        console.log("opsition\nst: ",st);
        console.log("ch: ",ch);
        console.log("first1: ",first1);
        console.log("last: ",last);
    */
    // Subst returns a number that is the mathematical result of the string obtained as a parameter. 
    SubSt = (st,ch)=>
    {
        var num= (st[0]!=='-')?parseFloat(st.substring(0,st.indexOf(ch))):parseFloat(st.substring(0,st.indexOf(ch,1)));
        var num1= (st[0]!=='-')?parseFloat(st.substring(st.indexOf(ch)+1)): parseFloat(st.substring(st.indexOf(ch,1)+1));
        if (this.isNumeric(st) && ch === 'A')
            return parseFloat(st);
        if (ch === '+')
            return num + num1;
        if (ch === '-')
            return num - num1;
        if (ch === '*')
            return num * num1;
        if (ch === '/')
            return num / num1;
        return 0;
    }
    position =(st)=>{
        last=st.length;
        for (let i = 1; i < st.length-1; i++)
        {
            if(st[i-1]==='-' && st[i]==='-')
            st = st.substring(0,i-1)+"+"+ st.substring(i+1);
            if((st[i-1]==='+' && st[i]==='-') || (st[i-1]==='-' && st[i]==='+'))
            st = st.substring(0,i-1)+"-"+ st.substring(i+1);
        }
        for (let i = 1; i < st.length-1; i++)
        {
            if (st[i] === '+' || (st[i] === '-' && st[i-1]!=='*' && st[i-1]!=='/' && st[i-1]!=='+'))
            {
                first1 = i ;
            } 
            if (st[i] === '*' || st[i] === '/')
            {
                ch = st[i];
                if(st[i+1]==='-')
                i++;
                for (var j = i+1; j < st.length; j++)
                {
                    if (st[j] === '*' || st[j] === '/' || st[j] === '+' || st[j] === '-')// && st[i-1]!='*' && st[i-1]!='/' && st[i-1]!='+'))
                    {
                        last = j;
                        j = st.length;
                    }
                    i = st.length;
                }
            }
        }
    }
    positionPlusMinus =(st)=>{
        last=st.length;
        first1=0;
        for (var i = 0; i < st.length; i++)
        {
            if ((st[i] === '+' )||( st[i] === '-' && i>0))
            {
                ch = st[i];
                for (var j = i+1; j < st.length; j++)
                {
                    if (st[j] === '+' || st[j] === '-')
                    {
                        last = j;
                        j = st.length;
                    }
                }
                i = st.length;
            }
        }  
    }
    /*Sum, receives a string (mathematical theorem) as a parameter and performs the arithmetic 
      operations and returns a string that is the result of the theorem.*/
    Sum=(st)=>
    {
        p = 0;
        p1 = 0;
        first1 = 0;
        last = 0;
        ch = 'A';
        for (var i = 1; i < st.length-1; i++)
        {
            if(st[i-1]==='-' && st[i]==='-')
                st = st.substring(0,i-1)+"+"+ st.substring(i+1);
            if((st[i-1]==='+' && st[i]==='-' )||( st[i-1]==='-' && st[i]==='+'))
                st = st.substring(0,i-1)+"-"+ st.substring(i+1);
            if(st[i-1]!=='*' && st[i-1]!=='/' && st[i-1]!=='+' && st[i-1]!=='-' && st[i]==='(')
                st = st.substring(0,i) +"*"+ st.substring(i);
            if(st[i]===')' && st[i+1]!=='*' && st[i+1]!=='/' && st[i+1]!=='+' && st[i+1]!=='-' )
                st = st.substring(0,i+1) +"*"+ st.substring(i+1);
            if (st[i] === '*' || st[i] === '/')
                p++;
            if (st[i] === '+' || st[i] === '-')
                p1++;
        }
        if(st.includes('(') && st.includes(')'))
        {
        var first2 = st.indexOf('(');
        var last2   = st.indexOf(')');
        ch = 'A';
        var st2= st.substring(st.indexOf('(')+1,st.indexOf(')'));
        if(this.isNumeric(st2))
        return this.Sum(st.substring(0,st.indexOf('('))+st2+ st.substring(st.indexOf(')')+1));
        if(st2.includes('*'))
        {
            this.position(st2);
                if(st2.indexOf('*')!==-1 && !st2.substring(st2.indexOf('*')+1).includes('*') && st2.indexOf('-')===-1 && st2.indexOf('/')===-1 && st2.indexOf('+')===-1)   
                    return this.Sum(st.substring(0,st.indexOf('('))+this.SubSt(st2,'*') + st.substring(st.indexOf(')')+1));
                 else
                     return (first1>0)?this.Sum(st.substring(0, first2+1 )+ st2.substring(0,first1+1) + this.SubSt(st2.substring(first1+1,last), ch)+ st2.substring(last) + st.substring(last2)):this.Sum(st.substring(0, first2+1) + this.SubSt(st2.substring(first1, last), ch) + st2.substring(last) + st.substring(last2));        
            }
            else
            if(st2.includes('/'))
            {
                this.position(st2);
                if(st2.indexOf('/')!==-1 && !st2.substring(st2.indexOf('/')+1).includes('/') && st2.indexOf('-')===-1 && st2.indexOf('+')===-1 && st2.indexOf('*')===-1)
                    return this.Sum(st.substring(0,st.indexOf('('))+this.SubSt(st2,'/') + st.substring(st.indexOf(')')+1));
                else
                    return (first1>0)?this.Sum(st.substring(0, first2+1 ) + st2.substring(0,first1+1) + this.SubSt(st2.substring(first1+1,last), ch) + st.substring(last2)):this.Sum(st.substring(0, first2+1) + this.SubSt(st2.substring(first1, last), ch) + st2.substring(last) + st.substring(last2));
            }
                else
                if(st2.includes('+'))
                {
                    this.positionPlusMinus(st2);
                    if(st2.indexOf('+')!==-1 && !st2.substring(st2.indexOf('+')+1).includes('+') && st2.indexOf('-')===-1 && st2.indexOf('/')===-1 && st2.indexOf('*')===-1)
                        return this.Sum(st.substring(0,st.indexOf('('))+this.SubSt(st2,'+') + st.substring(st.indexOf(')')+1));
                    else
                        return (first1>0)?this.Sum(st.substring(0, first2+1 ) +  this.SubSt(st2.substring(0,last), ch) + st2.substring(last) + st.substring(last2)):this.Sum(st.substring(0, first2+1) + this.SubSt(st2.substring(first1, last), ch)+st2.substring(last) + st.substring(last2));
                    
                }
                else
                if(st2.includes('-'))
                {
                    
                    this.positionPlusMinus(st2);
                    if(st2.indexOf('-')!==-1 && !st2.substring(1).substring(st2.indexOf('-')+1).includes('-') && st2.indexOf('+')===-1 && st2.indexOf('/')===-1 && st2.indexOf('*')===-1)
                    {
                        if(st[0]==='-')
                        return this.Sum(st.substring(0,st.indexOf('('))+ st2 + st.substring(st.indexOf(')')+1));
                        else
                        return this.Sum(st.substring(0,st.indexOf('('))+ this.SubSt(st2,ch) + st.substring(st.indexOf(')')+1));
                    }
                    else
                    return (first1>0)?this.Sum(st.substring(0, first2+1 ) +  this.SubSt(st2.substring(0,last), ch) + st2.substring(last) + st.substring(last2)):this.Sum(st.substring(0, first2+1) + this.SubSt(st2.substring(first1, last), ch)+st2.substring(last) + st.substring(last2));
                }
            
        } 
        first1=0;
        if (p === 0 && p1 === 0 )
            return st;
        if (p !== 0)
        {//If there is * or / in st.
            for (let i = 1; i < st.length-1; i++)
            {
                if(st[i-1]==='-' && st[i]==='-')
                    st = st.substring(0,i-1)+"+"+ st.substring(i+1);
                if((st[i-1]==='+' && st[i]==='-' )||( st[i-1]==='-' && st[i]==='+'))
                    st = st.substring(0,i-1)+"-"+ st.substring(i+1);
            }
            this.position(st);
            return (first1>0)?this.Sum(st.substring(0, first1)+ this.SubSt(st.substring(first1, last), ch)+st.substring(last)):this.Sum(st.substring(0, first1) + this.SubSt(st.substring(first1, last), ch)+ st.substring(last));
        }
        else if(p1!==0)
        {
            //If there is + or - in st widout * or /.
            for (var j = 1; j < st.length-1; j++)
            {
                if(st[j-1]==='-' && st[j]==='-')
                    st = st.substring(0,j-1)+"+"+ st.substring(j+1);
                if((st[j-1]==='+' && st[j]==='-' )||( st[j-1]==='-' && st[j]==='+'))
                    st = st.substring(0,j-1)+"-"+ st.substrjng(j+1);
            }
            this.positionPlusMinus(st); 
            return this.Sum(this.SubSt(st.substring(0, last), ch)  + st.substring(last));
        }    
    }
    render(){
        return <React.Fragment>
                <h4 className="h3" >Casio Calculator</h4>

                <div className="display1"><h1 className='display' >{this.state.string}</h1></div>

                <div className="d">
                 <br/>   
                <b className="th">   &nbsp; &nbsp; <b> Casio Calculator </b> &nbsp;&nbsp;&nbsp;  <button  className="a"><i className='fas fa-fingerprint' onClick={()=> this.play()}></i></button></b>
               
                <button key="dfsf" className="del" onClick={()=>this.clearDisplay()} text-align='center'><i className="material-icons">delete</i></button >
                <button className="del" onClick={()=>this.delOneChar()} text-align='center'><i className="material-icons">&#xe893;</i></button >
                <button className="del" onClick={()=>this.back()} text-align='center'><span className="material-icons">history</span></button >
                <br/>
                {chars.map(x =>  (x==='(' || x===')' || x==='.')?<button key={x} className="orenge" onClick={()=>this.hendel(x)}>{x}</button>:"")}
                {numbers.map(x => (!(x<7 || x>9))?<But key={x} onClick={()=>this.hendel(x)}>{x}</But>:"")}
                <br/>
                {numbers.map(x => (!(x<4 || x>6))?<But key={x} onClick={()=>this.hendel(x)}>{x}</But>:"")}
                <br/>
                {numbers.map(x => (x<4)?<But key={x} onClick={()=>this.hendel(x)}>{x}</But>:"")}
                <br/>
                {chars.map(x => (x==='+' || x==='-' )?<button key={x} className="orenge" onClick={()=>this.hendel(x)}>{x}</button>:'' )}
                <But  onClick={()=>this.hendel(0)}>{0}</But>
                <br/>
                {chars.map(x => (x==='*' || x==='/' )?<button key={x} className="orenge" onClick={()=>this.hendel(x)}>{x}</button>:(x==='=')?<button key={x} className="orenge"onClick={()=>this.equal()}>{x}</button>:'' )}
            </div>
        </React.Fragment>
    }
}
export default ButtonsOfCalculator;
