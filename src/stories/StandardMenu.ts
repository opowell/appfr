export default [
  {
    text: 'File',
    children: [
      {
        text: 'New',
        action: x => {
          console.log('click', x)
        }
      },
      {
        text: 'Open'
      },
      {
        text: 'View',
        children: [
          {
            text: 'View 1'
          },
          {
            text: 'View 2'
          }
        ]
      }
    ]
  },
  {
    text: 'Edit',
    children: [
      {
        text: 'Copy'
      },
      {
        text: 'Paste'
      }
    ]
  },
  {
    text: 'Help',
    children: [
      {
        text: 'About'
      },
      {
        text: 'Register'
      }
    ]
  }
]