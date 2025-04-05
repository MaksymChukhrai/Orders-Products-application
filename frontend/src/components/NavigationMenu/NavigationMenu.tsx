import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './NavigationMenu.module.scss';

const linkVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const NavigationMenu: React.FC = () => {
  return (
    <nav className={styles.navigationMenu}>
      <ul className={styles.menuList}>
        <li>
          <motion.div
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <NavLink
              to="/orders"
              className={({ isActive }) => isActive ? styles.activeLink : styles.link}
            >
              Orders
            </NavLink>
          </motion.div>
        </li>
        <li>
          <motion.div
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <NavLink
              to="/products"
              className={({ isActive }) => isActive ? styles.activeLink : styles.link}
            >
              Products
            </NavLink>
          </motion.div>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;