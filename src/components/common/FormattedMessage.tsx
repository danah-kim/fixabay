import { createElement, HTMLAttributes, memo } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';

interface formattedHtmlMessageProps extends HTMLAttributes<HTMLElement> {
  message: string;
  params?: Record<string, string | number>;
  isHtml?: boolean;
  type?: string;
}

export function FormattedHtmlMessage({
  message,
  params,
  isHtml = false,
  type = 'span',
  ...props
}: formattedHtmlMessageProps) {
  const { t } = useTranslation();
  const value = t(message, params);

  return isHtml ? (
    createElement(type, {
      dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(value.replace(/\\n/gi, '<br />')) },
      ...props,
    })
  ) : (
    <>{value}</>
  );
}

export default memo(FormattedHtmlMessage);
