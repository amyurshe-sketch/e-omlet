function StudioLogo({ as: Component = 'div', className = '', style }) {
  const classes = ['logo', 'handwrite', className].filter(Boolean).join(' ');

  return (
    <Component className={classes} style={style} aria-label="Studio NN logo">
      Studio NN
    </Component>
  );
}

export default StudioLogo;
