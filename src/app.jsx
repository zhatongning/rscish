// import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import React, { useState, useEffect, useLayoutEffect, Component } from '../react-bundles/react.development';
import { grids } from './random-grids'

// window.R2_ = React

// class App extends React.Component {
//   state = {
//     list: ['A', 'B', 'C'],
//   };
//   onChange = () => {
//     this.setState({ list: ['C', 'A', 'X'] });
//   };
//   componentDidMount() {
//     console.log(`App Mount`);
//   }
//   render() {
//     return (
//       <>
//         <Header />
//         <button onClick={this.onChange}>change</button>
//         <div className="content">
//           {this.state.list.map(item => (
//             <p key={item}>{item}</p>
//           ))}
//         </div>
//       </>
//     );
//   }
// }

// class Header extends React.PureComponent {
//   render() {
//     return (
//       <>
//         <h1>title</h1>
//         <h2>title2</h2>
//       </>
//     );
//   }
// }


const Footer = () => {

  useLayoutEffect(function () {
    console.log('useLayoutEffect in Footer')
  })

  useEffect(function () {
    console.log('useEffect in Footer')
  })

  return <footer>
    foot
  </footer>
}




class App extends Component {
  componentDidMount() {
    console.log(`App Mount`);
    console.log(`App 组件对应的fiber节点: `, this._reactInternals);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    return (
      <div className="app">
        {/* <header>header</header> */}
        {/* <Content /> */ }
        <GridController />
        {/* <Footer /> */}
      </div>
    );
  }
}

const GridController = () => {
  const [val, setVal] = useState('')

  const handleIpt = (e) => {

    setTimeout(() => {
      setVal(e.target.value)
      console.log('changed')
    }, 0)
  }

  return <>
    <Input onChange={ handleIpt } />
    <GridsRender sourceGrids={ grids } val={ val } />
  </>
}

const Input = ({ onChange }) => {

  return <input type="text" onChange={ onChange } />
}


// class Content extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       val: ''
//     }
//   }

//   componentDidMount() {
//     console.log(`Content Mount`);
//     console.log(`Content 组件对应的fiber节点: `, this._reactInternals);
//   }


//   handleIpt = (v) => {
//     this.props.changed(v)
//   }


//   render() {
//     const val = this.state.val
//     const res = grids.filter(grid => grid.id > Number(val))
//     console.log(val)
//     return (
//       <div>
//         <Input onIpt={ this.handleIpt } val={ val } />
//       </div>

//     );
//   }
// }

const GridsRender = ({ sourceGrids, val }) => {
  const res = sourceGrids.filter(grid => grid.id > (Number(val) || 0))
  return <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    { res.map((grid) => <span key={ grid.id } style={{ display: 'inline-block', width: 20, height: 20, backgroundColor: grid.color }}></span>) }
  </div>
}

export default App