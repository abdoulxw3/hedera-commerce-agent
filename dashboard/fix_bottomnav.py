with open('src/App.jsx', 'r') as f:
    content = f.read()

bottom_nav = """
      {mobile && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:100,
          background:"rgba(6,6,18,0.97)", borderTop:`1px solid ${C.border}`,
          backdropFilter:"blur(20px)", display:"flex", padding:"8px 0 20px" }}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>navTo(n.id)}
              style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center",
                gap:3, padding:"6px 0", border:"none", background:"transparent",
                cursor:"pointer", fontFamily:"inherit" }}>
              <span style={{ fontSize:20 }}>{n.icon}</span>
              <span style={{ fontSize:9, fontWeight:nav===n.id?700:400,
                color:nav===n.id?C.purpleL:C.t4 }}>{n.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      )}"""

old = "    </main>\n    </div>\n  );\n}"
new = "    </main>\n" + bottom_nav + "\n    </div>\n  );\n}"

if old not in content:
    print("ERROR: pattern not found")
    print("Last 200 chars:", repr(content[-200:]))
else:
    content = content.replace(old, new, 1)
    with open('src/App.jsx', 'w') as f:
        f.write(content)
    print("SUCCESS: bottom nav added")
