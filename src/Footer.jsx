import React from 'react'

export default function Footer() {
  return (
    <footer className="text-white text-center py-2" style={{
      background: "linear-gradient(to right, #4e00c2, #6a00ff)",
      position: "fixed",
      bottom: 0,
      width: "100%",
      zIndex: 1000
    }}>
      Build and Cared by <strong>Brijesh Prajapati</strong> with ❤️ and Support
    </footer>
  )
}
