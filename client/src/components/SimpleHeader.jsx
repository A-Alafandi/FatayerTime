// src/components/SimpleHeader/SimpleHeader.jsx

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

function SimpleHeader({ title, subtitle, children }) {
  return (
      <header className={styles.header} role="banner">
        <div className={styles.inner}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children}
        </div>
      </header>
  );
}

SimpleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(SimpleHeader);
