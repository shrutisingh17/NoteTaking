/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        iconColor: '#5f6368',
        textColor: '#202124',
        customYellow: '#feefc3',
        headerColor: '#5f6368', 
        hoverColor: 'rgba(0,0,0,.2)',
        borderColor: 'rgba(0,0,0,0.15)',
        pinnedColor: '#5f6368',
        d93025: '#d93025',
        label: '#3c4043',
        labelBg: 'rgba(0, 0, 0, 0.08)',
        light: 'rgba(0, 0, 0, 0.5)',
        search: '#1a73e8',
      },
      padding:{
        '5': '5px',
      },
      fontSize: {
        '15': '15px',
        '13': '13px',
        '11' : '11px',
        '22' : '22px',
      },
      letterSpacing: {
        '0.2': '0.2px',
      },
      width: {
        '566': '566px',
        '12.5': '12.5%',
        '15': '15px'
      },
      height: {
        '15': '15px',
      },
      boxShadow: {
        'shad': 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        'noteShadow': 'rgba(0, 0, 0, 0.2) 0px 3px 5px 0px',
        'custom': 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        'searchBar' :'rgba(65, 69, 73, 0.3) 0px 1px 1px 0px, rgba(65, 69, 73, 0.3) 0px 1px 3px 1px',
        // rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px
        'header': 'rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px',
      },
      minHeight: {
        'titleMinH': '38px',
        'contentMinH': '30px',
        'noteMinH': '60px',
        'SingleTitleMinH': '43px'
      },
      maxHeight: {
        'listMax': '60px',
        'contentMaxH': '340px',
        'completeMaxH': '170px',
        'singleNoteMaxH': '528px',
      },
      maxWidth: {
        '720': '720px',
        '800': '800px',
        '488' : '488px',
      },
      zIndex: {
        '4000': '4000',
        '4001': '4001',
        '5003':'5003'
      },
      lineClamp: {
        16: '16',
        10: '10',
      }
    },
  },
  plugins: [],    
}

