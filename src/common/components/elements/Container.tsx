import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  [propName: string]: ReactNode | string | undefined;
}

const Container = ({ children, className = '', ...others }: ContainerProps) => {
  return (
    <div
      className={`mb-10 mt-20 p-4 sm:p-6 md:p-8 lg:mt-0 ${className} `}
      {...others}
    >
      {children}
    </div>
  );
};

export default Container;
