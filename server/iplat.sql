-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-04-30 09:22:27
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iplat`
--

-- --------------------------------------------------------

--
-- 表的结构 `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `createTime` varchar(45) DEFAULT NULL,
  `desc` longtext,
  `logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `company`
--

INSERT INTO `company` (`id`, `name`, `createTime`, `desc`, `logo`) VALUES
(1, '天诺', '2017-07-12', NULL, NULL),
(2, '星均', '2017-07-13', NULL, NULL),
(4, '百威', '2017-07-14', NULL, NULL),
(5, '欧莱雅', '2017-07-15', NULL, NULL),
(6, '强生', '2017-07-16', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `goodimg`
--

CREATE TABLE `goodimg` (
  `id` int(11) NOT NULL,
  `good_id` int(11) NOT NULL,
  `src` longtext COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `coverImg` longtext NOT NULL,
  `desc` longtext NOT NULL,
  `buySingle` varchar(45) NOT NULL,
  `unitBuySingle` varchar(45) NOT NULL,
  `buyAll` varchar(45) NOT NULL,
  `unitBuyAll` varchar(45) NOT NULL,
  `midSingle` varchar(45) NOT NULL,
  `unitMidSingle` varchar(45) NOT NULL,
  `midAll` varchar(45) NOT NULL,
  `unitMidAll` varchar(45) NOT NULL,
  `sellSingle` varchar(45) NOT NULL,
  `unitSellSingle` varchar(45) NOT NULL,
  `sellAll` varchar(45) NOT NULL,
  `unitSellAll` varchar(45) NOT NULL,
  `num` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `orderinfo`
--

CREATE TABLE `orderinfo` (
  `id` int(11) NOT NULL,
  `total` varchar(45) COLLATE utf8_bin NOT NULL,
  `state` int(11) NOT NULL,
  `createTime` varchar(45) COLLATE utf8_bin NOT NULL,
  `createUser` varchar(45) COLLATE utf8_bin NOT NULL,
  `payTime` varchar(45) COLLATE utf8_bin NOT NULL,
  `payUser` varchar(45) COLLATE utf8_bin NOT NULL,
  `finishTime` varchar(45) COLLATE utf8_bin NOT NULL,
  `finishUser` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `ordertable`
--

CREATE TABLE `ordertable` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `price` varchar(45) COLLATE utf8_bin NOT NULL,
  `unit` varchar(45) COLLATE utf8_bin NOT NULL,
  `num` varchar(45) COLLATE utf8_bin NOT NULL,
  `totla` varchar(45) COLLATE utf8_bin NOT NULL,
  `order_id` int(11) NOT NULL,
  `coverImg` longtext COLLATE utf8_bin NOT NULL,
  `desc` longtext COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `fullName` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `role`
--

INSERT INTO `role` (`id`, `name`, `fullName`) VALUES
(1, 'root', '超级系统管理员'),
(2, 'admin', '公司管理员'),
(3, 'staff', '普通用户');

-- --------------------------------------------------------

--
-- 表的结构 `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `good_id` int(11) NOT NULL,
  `defaultUnit` int(11) NOT NULL,
  `num` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `type`
--

INSERT INTO `type` (`id`, `name`, `company_id`) VALUES
(1, '龙井', 1),
(2, '黄金芽', 1),
(3, '白茶', 1),
(4, '红茶', 1);

-- --------------------------------------------------------

--
-- 表的结构 `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `sign` longtext,
  `avatar` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `phone`, `password`, `age`, `role_id`, `company_id`, `sign`, `avatar`) VALUES
(1, 'root', '18063229110', '123', NULL, 1, 1, NULL, NULL),
(2, 'Ecode', '18063229116', '123', NULL, 2, 1, NULL, NULL),
(3, 'Yicoding', '18019458751', '123', NULL, 2, 2, NULL, NULL),
(5, '商陆', '18063229111', '123', NULL, 4, 1, NULL, NULL),
(6, '紫珠', '18063229112', '123', NULL, 6, 2, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goodimg`
--
ALTER TABLE `goodimg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderinfo`
--
ALTER TABLE `orderinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `goodimg`
--
ALTER TABLE `goodimg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `orderinfo`
--
ALTER TABLE `orderinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `ordertable`
--
ALTER TABLE `ordertable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
