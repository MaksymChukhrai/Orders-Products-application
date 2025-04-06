"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './NavigationMenu.module.scss';

const linkVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const NavigationMenu: React.FC = () => {
  const pathname = usePathname();

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
            <Link
              href="/orders"
              className={pathname === '/orders' ? styles.activeLink : styles.link}
            >
              Orders
            </Link>
          </motion.div>
        </li>
        <li>
          <motion.div
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/products"
              className={pathname === '/products' ? styles.activeLink : styles.link}
            >
              Products
            </Link>
          </motion.div>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;